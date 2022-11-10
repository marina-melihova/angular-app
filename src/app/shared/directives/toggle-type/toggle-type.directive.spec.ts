import { ToggleTypeDirective } from './toggle-type.directive';

const elRefMock = {
  nativeElement: document.createElement('button'),
};

describe('ToggleTypeDirective', () => {
  it('should create an instance', () => {
    const directive = new ToggleTypeDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
