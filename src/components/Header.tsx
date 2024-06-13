import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="h-custom-60 bg-gray-200 mb-4 shadow-lg text-black flex items-center justify-between px-4">
      <div className="flex space-x-4">
        <Link href="/viewList" legacyBehavior>
          <a className="hover:text-gray-400">نمایش فهرست</a>
        </Link>
        <Link href="/oldSite" legacyBehavior>
          <a className="hover:text-gray-400">سایت قدیم </a>
        </Link>
      </div>
      <div className="text-sm font-bold">
        <Link href="/" legacyBehavior>
          <a>شركت مديريت فناوري بورس تهران</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
