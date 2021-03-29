import responseStatus from "../interfaces/responseStatus";
import stylesI from "../interfaces/stylesI";
import {Style} from "../entity/Style";

export default class CvController {
    //Public
    public async getStyle(id: number): Promise<stylesI> {
        return Style.findOne(id);
    }

    public async getStyles(): Promise<stylesI[]> {
        return Style.find();
    }

    public async newStyle(style: stylesI): Promise<responseStatus> {
        const newStyle = new Style();
        newStyle.font = style.font;
        newStyle.main_color = style.main_color;
        try {
            await Style.save(newStyle);
            return this.setSuccessResponse();
        } catch (e) {
            console.log(e);
            return this.setErrorResponse('Error while adding new style');
        }
    }

    //Private
    private setErrorResponse(error: string): responseStatus {
        return {status: 'error', errors: [error]};
    }

    private setSuccessResponse(): responseStatus {
        return {status: 'success', errors: []}
    }
}