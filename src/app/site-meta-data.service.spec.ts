import { TestBed } from '@angular/core/testing';

import { SiteMetaDataService } from './site-meta-data.service';

describe('SiteMetaDataService', () => {
  let service: SiteMetaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteMetaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
