import { TestBed, inject } from '@angular/core/testing';

import { FaceapiService } from './faceapi.service';

describe('FaceapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaceapiService]
    });
  });

  it('should be created', inject([FaceapiService], (service: FaceapiService) => {
    expect(service).toBeTruthy();
  }));
});
