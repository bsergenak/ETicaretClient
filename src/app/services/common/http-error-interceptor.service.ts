﻿import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

    constructor(private toastrService: CustomToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError(error => {
            switch (error.status) {
                case HttpStatusCode.Unauthorized:
                    this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadir!", "Yetkisiz İşlem", {
                        messageType: ToastrMessageType.Warning,
                        position: ToastrPosition.BottomFullWidth
                    });
                    break;
                case HttpStatusCode.InternalServerError:
                    this.toastrService.message("Sunucu erişimi sağlanamadı.", "Sunucu Hatası", {
                        messageType: ToastrMessageType.Warning,
                        position: ToastrPosition.BottomFullWidth
                    });
                    break;
                case HttpStatusCode.BadRequest:
                    this.toastrService.message("Geçersiz istek yapıldı", "Geçersiz İstek", {
                        messageType: ToastrMessageType.Warning,
                        position: ToastrPosition.BottomFullWidth
                    });
                    break;
                case HttpStatusCode.NotFound:
                    this.toastrService.message("Sayfa bulunamadı", "Sayfa bulunamadı", {
                        messageType: ToastrMessageType.Warning,
                        position: ToastrPosition.BottomFullWidth
                    });
                    break;
                default:
                    this.toastrService.message("Beklenmeyen bir hata meydana gelmistir", "Hata", {
                        messageType: ToastrMessageType.Warning,
                        position: ToastrPosition.BottomFullWidth
                    });
                    break;
            }
            return of(error);
        }));
    }
}
