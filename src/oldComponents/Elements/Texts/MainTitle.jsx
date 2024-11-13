const MainTitle = (props) => {
    const { text, className, tag } = props;

    return (
        tag == null ? (
            <h1 className={className != null ? className : ""}>{text}</h1>
        ) : tag === "h1" ? (
            <h1 className={className != null ? className : ""}>{text}</h1>
        ) : tag === "h2" ? (
            <h2 className={className != null ? className : ""}>{text}</h2>
        ) : tag === "h3" ? (
            <h3 className={className != null ? className : ""}>{text}</h3>
        ) : tag === "h4" ? (
            <h4 className={className != null ? className : ""}>{text}</h4>
        ) : tag === "h5" ? (
            <h5 className={className != null ? className : ""}>{text}</h5>
        ) : tag === "h6" ? (
            <h6 className={className != null ? className : ""}>{text}</h6>
        ) : null
    );
};


export default MainTitle