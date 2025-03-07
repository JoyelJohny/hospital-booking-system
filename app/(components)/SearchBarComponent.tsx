import Form from "next/form";
import Image from "next/image";

import searchIcon from "@/public/search.png"

type props = {
    placeHolder: string,
    searchAction: () => void;
    searchBoxStyling?: string,
    textBoxStyling?: string,
    searchButtonStyling?: string,
}
export default function SearchBar({ searchAction, placeHolder, textBoxStyling, searchButtonStyling, searchBoxStyling }: props) {
    return (
        <Form action={searchAction} className={searchBoxStyling ? searchBoxStyling : "flex h-10 overflow-hidden"}>
            <input type="text" className={textBoxStyling ? textBoxStyling : "w-full py-1 px-3 focus:outline-none border border-r-0 rounded-l-full border-blue-700"} placeholder={placeHolder} autoCorrect="false" />
            <button className={searchButtonStyling ? searchButtonStyling : "flex border border-blue-700 bg-blue-700 rounded-r-full items-center justify-center w-12"}>
                <Image src={searchIcon} className="size-5" alt="" />
            </button>

        </Form>
    )
}