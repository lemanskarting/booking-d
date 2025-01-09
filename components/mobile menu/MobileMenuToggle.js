function MobileMenuToggle({
  className,
  ariaLabel = "навигация",
  onClick,
  isOpen,
}) {
  return (
    <span className={`lg:hidden ${className}`}>
      <button
        onClick={onClick}
        id="mainmenu-button"
        aria-label={ariaLabel}
        type="button"
        className={`${isOpen ? "open" : ""} navbar-toggler hidden-md-up`}
      >
        <div className="burger">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </span>
  );
}

export default MobileMenuToggle;
