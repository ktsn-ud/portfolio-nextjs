interface HeadingProps {
  labelJa: string;
  labelEn: string;
}

export default function Heading({ labelJa, labelEn }: HeadingProps) {
  return (
    <h2 className="block relative my-6">
      <div className="relative font-extrabold text-4xl text-text-muted select-none">
        {labelEn}
        <div className="absolute text-3xl top-5 left-6 text-text tracking-wider select-text">
          {labelJa}
        </div>
      </div>
    </h2>
  );
}
