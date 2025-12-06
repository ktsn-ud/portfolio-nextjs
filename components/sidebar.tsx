import Image from "next/image";
import profileIcon from "@/public/img/profile_icon.webp";
import TableOfContents from "./tableOfContents";
import { IoLogoGithub } from "react-icons/io5";

export default function Sidebar() {
  return (
    <div className="relative lg:fixed lg:h-full lg:w-75 lg:top-0 lg:left-0 bg-sidebar-bg text-bg px-7 py-10">
      <div>
        <Profile />
        <hr className="w-full my-6" />
        <TableOfContents />
      </div>
      <a
        href="https://github.com/ktsn-ud"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IoLogoGithub className="w-8 h-8 absolute bottom-5 left-5"></IoLogoGithub>
      </a>
    </div>
  );
}

function Profile() {
  return (
    <div>
      {/* アイコン・名前（中央揃え） */}
      <div className="flex flex-col items-center justify-center">
        <Image
          src={profileIcon}
          alt="プロフィール画像"
          className="w-32 h-32 rounded-full object-cover"
        />
        <p className="my-4 font-bold">きつねうどん</p>
      </div>
      {/* 所属 */}
      <p className="text-sm mx-3">
        千葉大学
        <br />
        理学部 数学・情報数理学科
        <br />
        （情報数理学コース）
      </p>
    </div>
  );
}
