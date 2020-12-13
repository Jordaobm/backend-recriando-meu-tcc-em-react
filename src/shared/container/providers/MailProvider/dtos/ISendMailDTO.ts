import IParseMailTemplateDTO from "../../MailTemplateProvider/dtos/IParseMailTemplateDTO";

interface IMailContat {
  name: string;
  email: string
}

export default interface ISendMailDTO {
  to: IMailContat;
  from?:IMailContat;
  subject:string;
  templateData:IParseMailTemplateDTO;
}
