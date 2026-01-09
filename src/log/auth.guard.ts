import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Lấy header Authorization
    const authHeader = request.headers['authorization'];

    // Kiểm tra định dạng và giá trị của Token
    // Mong đợi: "Bearer 1234567890"
    if (authHeader === `Bearer ${process.env.DECK_LOG_SECRET_TOKEN}`) {
      return true; // Cho phép đi tiếp vào Controller
    }

    // Nếu không khớp, ném lỗi 401 Unauthorized
    throw new UnauthorizedException('Token không hợp lệ hoặc thiếu Authorization header');
  }
}