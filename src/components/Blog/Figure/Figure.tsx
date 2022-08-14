export const Figure = ({ children, figcaption }) => {
  return (
    <figure className="mt-2 mb-10">
      <video autoPlay muted loop className="rounded-lg">
        {children}
      </video>
      <figcaption className="text-sm leading-loose">{figcaption}</figcaption>
    </figure>
  );
};
