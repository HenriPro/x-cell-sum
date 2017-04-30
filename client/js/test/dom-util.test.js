const { removeChildren } = require('../dom-util');

describe('dom-util', () => {
  it('removes one child', () => {
    //set up intial state
    const parent = document.createElement('DIV');
    const child = document.createElement('STRONG');
    parent.appendChild(child);

    // inspect intial state
    expect(parent.childNodes.length).toBe(1);
    expect(parent.childNodes[0]).toBe(child);

    //execute code under test
    removeChildren(parent);

    //insepct resulting state
    expect(parent.childNodes.length).toBe(0);
  });
});
