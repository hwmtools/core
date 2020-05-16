import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIRoleData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { Role } from '../structures/guilds/Role';
import type { Guild } from '../structures/guilds/Guild';

export class RoleStore extends DataStore<Role> {

	public readonly guild: Guild;

	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('Role'));
		this.guild = guild;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 * @param cache If the data should be cached
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIRoleData, cache = true): Role {
		const existing = this.get(data.id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (cache) this.set(entry.id, entry);
		return entry;
	}

}
