import Image from "next/image";

export default function SimpleStat({ value, subtitle, logo }) {
  return (
    <div className="min-w-[250px] rounded-lg bg-slate-850 flex gap-4 p-4 h-24 w-full min-w-72 border border-slate-700">
      <div className="items-center flex grow">
        <Image
          width={16}
          height={16}
          className="h-16 w-16 min-w-16 min-h-16 bg-neutral-850 rounded-lg"
          src={logo}
          alt={subtitle}
        />
        <div className="ml-2 mr-4">
          <p className="text-xl mr-2 font-bold">{value}</p>
          <p className="text-slate-200">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
