import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import HTMLParser, { NodeType, parse } from "node-html-parser";
import Singer, { ISinger } from "../models/singer";
import Song, { ISong } from "../models/song";

export enum SingersTypes {
    Our,
    Foreign
}

const myChordsUrl = "https://mychords.net";

export default class MyChordsService {
    public static async fetchData() {
        const singers = Array<ISinger>();

        const ourSingers = await MyChordsService.retrieveAllSingersByType(SingersTypes.Our);
        if (ourSingers != null) {
            singers.push(...ourSingers);
        }
        console.log(`our singers: ${ourSingers.length}`);

        const foreignSingers = await MyChordsService.retrieveAllSingersByType(SingersTypes.Foreign);
        if (foreignSingers != null) {
            singers.push(...foreignSingers);
        }
        console.log(`foreign singers: ${foreignSingers.length}`);

        for (let i = 0; i < singers.length; ++i) {
            singers[i] = await Singer.create(singers[i]);

            console.log(`singer: ${singers[i]} saved`);
            const singerSongs = await MyChordsService.retrieveAllSongsBySinger(singers[i]);
            if (singerSongs == null || singerSongs.length < 1) {
                console.log(`no songs`);
            } else {
                console.log(`number of songs: ${singerSongs.length}`);
            }

            for (let j = 0; j < singerSongs.length; ++j) {
                singerSongs[j].chordsAndText = await MyChordsService.retrieveSongText(singerSongs[j].href);
                singerSongs[j] = await Song.create(singerSongs[j]);
                console.log(`song: ${singerSongs[j]} saved`);
            }
        }
        console.log("completed");
    }

    public static async retrieveAllSingersByType(type: SingersTypes): Promise<ISinger[]> {
        let typeStringUrl = "";
        switch (type) {
            case SingersTypes.Our:
                typeStringUrl = "/nashi";
                break;
            case SingersTypes.Foreign:
                typeStringUrl = "/zarub";
                break;
        }
        const allSingersUrl = `${myChordsUrl}${typeStringUrl}/page/1/`;
        let response = await this.requestUntilResponse(allSingersUrl);
        if (response == null) {
            return null;
        }

        const singers = Array<ISinger>();

        let root = parse(response.data.toString()) as HTMLParser.HTMLElement;

        const paginatorAllLi = root.querySelectorAll(".b-pagination li");
        const numberOfPages = Number(paginatorAllLi[paginatorAllLi.length - 2].text);

        for (let i = 1; i <= numberOfPages; ++i) {
            const pageSingersUrl = `${myChordsUrl}${typeStringUrl}/page/${i}/`;
            response = await this.requestUntilResponse(pageSingersUrl);
            if (response == null) {
                continue;
            }

            root = parse(response.data.toString()) as HTMLParser.HTMLElement;

            const allSingersOnPage = root.querySelectorAll(".b-listing-singers__item__name_m");

            const singersOnPage: ISinger[] = allSingersOnPage.map<ISinger>((element) => {
                return {
                    name: element.text.replace(/[\n\r\t]/g, ""),
                    href: element.querySelector("a").attributes.href,
                } as ISinger;
            });

            singers.push(...singersOnPage);
        }

        return singers;
    }

    public static async retrieveAllSongsBySinger(singer: ISinger): Promise<ISong[]> {
        const allSingerSongsUrl = myChordsUrl + singer.href;

        let response = await this.requestUntilResponse(allSingerSongsUrl);
        if (response == null) {
            return null;
        }

        const songs = Array<ISong>();

        let root = parse(response.data.toString()) as HTMLParser.HTMLElement;

        const paginatorAllLi = root.querySelectorAll("ul.b-pagination li");
        let numberOfPages = 1;
        if (paginatorAllLi != null && paginatorAllLi.length > 0) {
            numberOfPages = Number(paginatorAllLi[paginatorAllLi.length - 2].text);
        }

        for (let i = 1; i <= numberOfPages; ++i) {
            response = await this.requestUntilResponse(`${allSingerSongsUrl}page/${i}/`);
            if (response == null) {
                continue;
            }

            root = parse(response.data.toString()) as HTMLParser.HTMLElement;

            const allSongsOnPage = root.querySelectorAll("ul.b-listing li.b-listing__item");

            const songsOnPage: ISong[] = allSongsOnPage.map<ISong>((element) => {
                const songTagA = element.querySelector(".b-listing__item__link");
                return {
                    singerId: singer._id,
                    title: songTagA.text.replace(/[\n\r\t]/g, "").trim(),
                    href: songTagA.attributes.href,
                } as ISong;
            });

            songs.push(...songsOnPage);
        }

        return songs;
    }

    public static async retrieveSongText(href: string): Promise<string> {
        if (href == null || href.length < 1) {
            return "";
        }
        const songUrl = myChordsUrl + href;

        const response = await this.requestUntilResponse(songUrl);
        if (response == null) {
            return null;
        }

        const root = parse(response.data.toString(), { pre: true }) as HTMLParser.HTMLElement;

        const songTextElem = root.querySelector("pre.w-words__text");

        const preElem = parse(songTextElem.text);

        preElem.childNodes = preElem.childNodes.filter((node) => {
            if (node.nodeType === NodeType.ELEMENT_NODE && (node as HTMLParser.HTMLElement).classNames.includes("w-words__links")) {
                return false;
            }
            return true;
        });

        return preElem.text.replace("Взято с сайта https://mychords.net", "");
    }

    private static async requestUntilResponse(url: string): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.get(url, {
                headers: {
                    Cookie: "__cfduid=d56cb7cb66320a4deffefbf414ee4e9731570992490; PHPSESSID=n70sjsj69d98hh01cjvmrhe29d; isMobile=0; isMobileOld=0; mfgp=1311795708; _ym_uid=1570992582107518189; _ym_d=1570992582; _ym_isad=1"
                }
            } as AxiosRequestConfig);
            if (response.status !== 200) {
                console.log(`request ${url} error ${response.status}`);
                return await this.requestUntilResponse(url);
            }
            return response;
        } catch (e) {
            if (e.response != null && e.response.status != null && e.response.status === 451) {
                console.log(`${url} заблокировано на территории РФ`);
                return null;
            }
            console.log(`request ${url} error`);
            return await this.requestUntilResponse(url);
        }
    }
}
