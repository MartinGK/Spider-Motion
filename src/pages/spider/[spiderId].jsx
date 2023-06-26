import { useEffect, useState } from "react";
import useImagesVariables from "../../stores/ImagesVariables";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaSpider } from "react-icons/fa";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import TypingEffect from "../../components/TypingEffect";
import { GiSpiderWeb } from "react-icons/gi";
import "../../app/globals.css";

export default function SpiderId() {
  const router = useRouter();
  const [spider, setSpider] = useState(null);
  const { spiderId } = router.query;
  const { data, fetch } = useImagesVariables();

  useEffect(() => {
    if (!data.length) {
      fetch();
    } else {
      setSpider(data.find((item) => item.id === parseInt(spiderId)));
    }
  }, [data, spiderId]);

  const handleClickBack = () => {
    router.push("/");
  };

  return (
    <div className="h-screen w-screen bg-red-700 text-black font-bold relative overflow-scroll">
      <MdOutlineKeyboardBackspace
        className="absolute top-1 left-1 w-10 h-10 bg-red-400 rounded-full hover:bg-red-600 cursor-pointer"
        onClick={handleClickBack}
      />
      <div
        className={`flex align-center justify-center transition-all duration-1000  ${
          spider ? "h-80" : "h-0"
        }`}
      >
        <Image
          src={spider ? spider.imgUrl : "/"}
          alt={spider ? spider.name : ""}
          width={300}
          height={300}
        />
      </div>
      <article className="p-5">
        <h1 className="text-3xl  text-center mb-5 font-Spider uppercase animate-wiggle">
          {spider?.name}
        </h1>
        {/* <p className="pb-3 ">{spider?.description}</p> */}
        <TypingEffect text={spider ? spider.description : ""} />
        <div className="grid gap-2 grid-flow-row">
          <div>
            <h2 className="text-2xl font-Spider uppercase mt-5 flex"><GiSpiderWeb className="mr-2"/>Comics </h2>
            <ul className="text-xs pl-5 grid gap-1">
              {spider?.comics.map((comic, i) => (
                <li key={`comic-${i}`} className="flex items-center">
                  <FaSpider className="mr-1" />
                  <span>{comic}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-Spider uppercase mt-5 flex"><GiSpiderWeb className="mr-2"/>Series </h2>
            <ul className="text-xs pl-5  grid gap-1 ">
              {spider?.series.map((serie, i) => (
                <li key={`serie-${i}`} className="flex items-center">
                  <FaSpider className="mr-1" />
                  <span>{serie}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
