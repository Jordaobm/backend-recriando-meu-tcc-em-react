export default interface IUpdateProductDTO {
    id:string;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
    category_id: string;
    measure: string;
}