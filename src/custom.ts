import { PRODUCTION } from './constants';
import { initTestBlockContainer } from './test/blockContainer';
import { hunting } from './test/hunting';
import { initTestMsg } from './test/msgTest';
import { initTest } from './test/test';

export const initCustom = () => {
	//TEST
	if (!PRODUCTION) {
		initTestBlockContainer();
		initTestMsg();
		initTest();
		//! DONT WORK CHANGE CONTAINER
		// initTestContainerChangeEvent();
		hunting();
	}
};
