type ScrollToProps = {
  id: string;
};

export const scrollTo = ({ id }: ScrollToProps) => {
  const to = document.getElementById(id)!.getBoundingClientRect().top;

  window.scrollTo({
    top: to,
    behavior: "smooth",
  });
};
