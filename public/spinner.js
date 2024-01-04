(() => {
    const remove = () => {
        document.querySelector(".spinner").remove();
        window.removeEventListener("load", remove);
    };
    window.addEventListener("load", remove);
})();
