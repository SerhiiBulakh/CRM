import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Position, Message } from '../../shared/interfaces'
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})


export class PositionsService implements OnInit {
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {

    }

    fetch(categoryId): Observable<Position[]> {
        return this.http.get<Position[]>(`/api/position/${categoryId}`)
    }

    create(position: Position): Observable<Position> {
        return this.http.post<Position>('/api/position', position)
    }
    update(position: Position): Observable<Position> {
        return this.http.patch<Position>(`/api/position/${position._id}`, position)
    }

    delete(position: Position): Observable<Message> {
        return this.http.delete<Message>(`/api/position/${position._id}`)
    }

}
