import XSVG from "./XSVG";

function Circle({datasender, x, y, iconSize}) {
  return (
    <div data-sender={datasender} style={{width:iconSize, height:iconSize, transform: `translate(${x - iconSize/2}px, ${y - iconSize/2}px)`}}>
      <XSVG/>
    </div>
  );
}

export default Circle;
