import Title from "../../basic/Title";
import Penalty from "./penalty/Penalty";

export default function ReturnReport() {
    return(
        <div>
            <Title imageSrc="/img/vehicle-step.png" title="반납 보고서" />
            <Penalty />
        </div>
    );
}