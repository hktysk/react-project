import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from '../App';

describe('初期ページ', () => {
  let dom: ShallowWrapper;
  beforeEach(() => {
    dom = shallow(<App />);
  })

  it('文章が正しく表示されているか', () => {
    expect(
      dom.find('[data-test="init"]').text()
    ).toEqual('OK, React');
  })
})
