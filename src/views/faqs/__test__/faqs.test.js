import get from '../faqs';

describe('faqs Page', () => {
  it('should route faqs page', () => {
    const mockSpyResponse = {
      render: jest.fn(),
    };
    const req = {
      session: {
        customer: {},
      },
    };
    get(req, mockSpyResponse);
    expect(mockSpyResponse.render).toHaveBeenCalledWith('faqs');
  });
});
