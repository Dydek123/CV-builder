import responseStatus from "../interfaces/responseStatus";
import stylesI from "../interfaces/stylesI";
import {Style} from "../entity/Style";
import templateI from "../interfaces/templateI";
import {Template} from "../entity/Template";

export default class CvController {
    //Public
    public async getStyle(id: number): Promise<stylesI> {
        return Style.findOne(id);
    }

    public async getStyles(): Promise<stylesI[]> {
        return Style.find();
    }

    public async createStyle(style: stylesI): Promise<responseStatus> {
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

    //Templates

    public async getTemplates(): Promise<templateI[]> {
        return Template.find();
    }

    public async getTemplate(id:number): Promise<templateI> {
        return Template.findOne(id);
    }

    public async createTemplate(template: templateI): Promise<responseStatus> {
        const newTemplate = new Template();
        newTemplate.type = template.type;
        newTemplate.preview = template.preview;
        newTemplate.file = template.file;
        try {
            await Template.save(newTemplate);
            return this.setSuccessResponse();
        } catch (e) {
            console.log(e);
            return this.setErrorResponse('Error while adding new template');
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
