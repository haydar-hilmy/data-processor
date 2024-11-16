const LabeledInputWrap = (props) => {
    const { children, variant } = props;

    return(
        <div className={`${variant} flex flex-col gap-2 w-fit`}>
            {children}
        </div>
    )
}

export default LabeledInputWrap