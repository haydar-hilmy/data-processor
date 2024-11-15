import styled from "styled-components"


const StyledNav = styled.div`
width: 100%;
display: flex;
gap: 2px;

div.linkSubNav{
    letter-spacing: 0.03rem;
    padding: 4px 18px;
    border-bottom-width: 2px;
    border-bottom-color: transparent;
    transition: opacity 0.15s;
    cursor: pointer;
    user-select: none;
    font-weight: normal;
}
div.activeLinkSubNav{
    border-bottom-width: 2px;
    border-bottom-color: #424242;
}
div.linkSubNav:hover{
    border-bottom-width: 2px;
    border-bottom-color: #424242;
    opacity: 0.6;
}

`

const SubNav = (props) => {
    const { children } = props

    return (
        <StyledNav>
            {children}
        </StyledNav>
    )
}

export default SubNav