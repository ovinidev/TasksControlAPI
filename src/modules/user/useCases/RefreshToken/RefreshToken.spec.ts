/* eslint-disable prefer-const */

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

let refreshTokenUseCase: RefreshTokenUseCase;

describe('Refresh token', () => {
	beforeEach(() => {
		refreshTokenUseCase = new RefreshTokenUseCase();
	});

	it('Should be able to update a user', async () => {
		const refreshToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk2NjI4MjUsImV4cCI6MTcwMTE5ODgyNSwic3ViIjoiY2xhdTJvb3h2MDAwMHE3NGQ2aHg2ZTV5aSJ9.ANteylTzDyhJBP2r8_u10H_eR7ScDZTng4GyIDx-HMQ';

		const newToken = await refreshTokenUseCase.execute(refreshToken);

		expect(refreshToken).not.toEqual(newToken);
	});
});
