(() => {
    const remove = () => {
        window.removeEventListener("load", remove);
        document.querySelector("body").classList.remove("loading")
        setTimeout(() => document.querySelector(".spinner").remove(), 500)
    };
    window.addEventListener("load", remove);
})();
