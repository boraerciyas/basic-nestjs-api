import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { City } from '../../cities/entities/city.entity';
import { Agent } from '../../agents/entities/agent.entity';

export type HouseDocument = House & Document;

@Schema()
export class House {
  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  bedroomCount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true })
  city: City;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true })
  agent: Agent;
}

export const HouseSchema = SchemaFactory.createForClass(House);
