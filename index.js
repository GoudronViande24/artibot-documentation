import { SlashCommandBuilder } from "discord.js";
import Artibot, { Module, SlashCommand } from "artibot";

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { version } = require('./package.json');

/**
 * Documentation module
 * Allows to create a custom help command from a simple config.
 * @author GoudronViande24
 * @license MIT
 * @param {Artibot} artibot
 * @returns {Module}
 */
export default (artibot, customConfig) => {
	try {
		var { name, commandName, commandDescription, argName, argDescription, pages } = customConfig;
		if (!commandDescription || !argDescription || !pages) throw new Error("[Documentation]: config is not valid!");
		if (!name) name = "Documentation";
		if (!commandName) commandName = "documentation";
		if (!argName) argName = "page";

		var choices = [];
		pages.forEach(page => choices.push({ name: page.name, value: page.name }));
	} catch {
		throw new Error("[Documentation]: config is not valid!");
	}

	return new Module({
		id: "documentation",
		name: "Documentation",
		version,
		repo: "GoudronViande24/artibot-documentation",
		packageName: "artibot-documentation",
		langs: "any",
		parts: [
			new SlashCommand({
				id: commandName,
				data: new SlashCommandBuilder()
					.setName(commandName)
					.setDescription(commandDescription)
					.addStringOption(option =>
						option
							.setName(argName)
							.setDescription(argDescription)
							.setRequired(true)
							.addChoices(...choices)
					),
				mainFunction: async (interaction, { createEmbed }) => {
					const page = pages.find(page => page.name == interaction.options.getString(argName));

					const embed = createEmbed()
						.setTitle(`${name} | ${page.name}`)
						.setDescription(page.content);

					if (page.icon) embed.setThumbnail(page.icon);
					if (page.image) embed.setImage(page.image);
					if (page.author) embed.setAuthor(page.author);

					await interaction.reply({
						embeds: [embed],
						ephemeral: true
					});
				}
			})
		]
	});
}