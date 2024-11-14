import styled from 'styled-components';

const StyledWrapper = styled.div`
  label.customBtn {
   outline: none;
   cursor: pointer;
   border: none;
   padding: 0.8rem 1.8rem;
   margin: 0;
   font-family: inherit;
   font-size: inherit;
   position: relative;
   display: inline-block;
   letter-spacing: 0.04rem;
   font-weight: 500;
   font-size: inherit;
   border-radius: 500px;
   overflow: hidden;
   background: #000;
   color: white;
  }

  label.customBtn span {
   position: relative;
   z-index: 10;
   transition: color 0.4s;
   display: flex;
   gap: 6px;
   align-items: center;
  }

  label.customBtn:hover span {
   color: inherit;
  }

  label.customBtn::before,
  label.customBtn::after {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 0;
  }

  label.customBtn::before {
   content: "";
   background: #15803d;
   width: 120%;
   left: -10%;
   transform: skew(10deg);
   transition: transform 0.3s cubic-bezier(0.3, 1, 0.8, 1);
  }

  label.customBtn:hover::before {
   transform: translate3d(-100%, 0, 0);
  }`;

const ButtonFile = (props) => {
    const { name, value, variant, text = "Upload", accept, onchange, customButton = true } = props
    return (
        !customButton ? (
            <>
                <div>
                    <input id={name} onChange={onchange} accept={accept} name={name} value={value} className={`hidden`} type="file" />
                    <label style={{ minWidth: "fit-content" }} className={`${variant} cursor-pointer bg-green-700 hover:opacity-80 duration-150 text-white py-2 px-3 rounded-md flex gap-2 items-center`} htmlFor={name}>
                        <i className="fas fa-upload"></i>
                        {text}
                    </label>
                </div>
            </>
        ) : (
            <>
                <div>
                    <input id={name} onChange={onchange} accept={accept} name={name} value={value} className="hidden" type="file" />
                    <StyledWrapper>
                        <label className={`${variant} customBtn`} htmlFor={name}>
                            <span>
                                <i className="fas fa-upload"></i>
                                {text}
                            </span>
                        </label>
                    </StyledWrapper>
                </div>
            </>

        )
    )
}
export default ButtonFile