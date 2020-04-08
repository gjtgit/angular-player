import { TestBed } from '@angular/core/testing';

import { VideoSrvService } from './video-srv.service';

describe('VideoSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoSrvService = TestBed.get(VideoSrvService);
    expect(service).toBeTruthy();
  });
});
