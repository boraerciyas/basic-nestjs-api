import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CitiesModule } from './cities/cities.module';
import { AgentsModule } from './agents/agents.module';
import { HousesModule } from './houses/houses.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://<user>:<password>@<cluster>/tiko-demo?retryWrites=true&w=majority',
    ),
    CitiesModule,
    AgentsModule,
    HousesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
