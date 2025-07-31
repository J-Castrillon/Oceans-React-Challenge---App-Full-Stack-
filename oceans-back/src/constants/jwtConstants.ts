import { ConfigService } from "@nestjs/config";

export const jwtConstants = (configService: ConfigService) => ({
    SECRET: configService.get<string>("JWT_SECRET"),
});