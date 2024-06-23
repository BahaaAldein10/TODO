function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <footer className="p-5">
      <h1 className="p-1 border-b border-white w-fit block m-auto">
        © {currentYear} Bahaa Aldein
      </h1>
    </footer>
  );
}

export default Footer;
