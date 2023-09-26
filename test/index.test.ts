// const  {Index} = require('../src/index')
import {describe, expect, test} from '@jest/globals';
import {Index} from '../src/index'

test('create port and return it',()=>{
    const index=new Index(3000);
    expect(index.getPort()).toBe(3000);
});

    // Should return the port number set in the constructor
it('should return the port number set in the constructor', () => {
    const index = new Index(5000);
    expect(index.getPort()).toBe(5000);
});
    // Should return 0 if the port number passed to the constructor is 0
it('should return 0 if the port number passed to the constructor is 0', () => {
    const index = new Index(0);
    expect(index.getPort()).toBe(0);
});