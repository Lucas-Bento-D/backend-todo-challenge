import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModuleOptions, ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({})
export class ConfigModule extends NestConfigModule{
    static forRoot<ValidationOptions extends Record<string, any>>(options?: ConfigModuleOptions<ValidationOptions>): Promise<DynamicModule> {
        return super.forRoot({
            isGlobal: true,
        })
    }
}
