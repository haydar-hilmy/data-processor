import Input from "../LabeledInput/Input"
import Label from "../LabeledInput/Label"
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
   background: #15803d;
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
   background: #000;
   width: 120%;
   left: -10%;
   transform: skew(30deg);
   transition: transform 0.3s cubic-bezier(0.3, 1, 0.8, 1);
  }

  label.customBtn:hover::before {
   transform: translate3d(-100%, 0, 0);
  }`;

const ButtonFile = (props) => {
    const { name, value, className, text = "Input File", accept, onchange, customButton = true } = props
    return (
        !customButton ? (
            <>
                <div>
                    <Input onchange={onchange} accept={accept} type="file" name={name} value={value} className={`${className} hidden`} />
                    <label className="cursor-pointer bg-green-700 hover:bg-green-600 duration-150 text-white py-2 px-5 rounded-md flex gap-2 items-center" htmlFor={name}>
                        <i className="fas fa-upload"></i>
                        {text}
                    </label>
                </div>
            </>
        ) : (
            <>
                <div>
                    <Input onchange={onchange} accept={accept} type="file" name={name} value={value} className={`${className} hidden`} />
                    <StyledWrapper>
                        <label className="customBtn" htmlFor={name}>
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