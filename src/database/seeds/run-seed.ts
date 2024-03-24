import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { BookSeedService } from './book/book-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(BookSeedService).run();

  await app.close();
};

void runSeed();
