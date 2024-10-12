import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Client {
    
    @Prop({unique: true, required: true})
    name: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    phone: string;

    @Prop({required: true})
    password: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);