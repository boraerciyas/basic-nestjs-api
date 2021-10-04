import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { City } from '../../cities/entities/city.entity';

export type AgentDocument = Agent & Document;

@Schema()
export class Agent {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true })
  city: City;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
