import { SlashCommandBuilder } from "@discordjs/builders";
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
export default ({ config }) => {
	try {
		var { name, commandName, commandDescription, argName, argDescription, pages } = config.documentation;
		if (!name || !commandName || !commandDescription || !argName || !argDescription || !pages) throw new Error();
		var choices = [];
		pages.forEach(page => choices.push([page.name, page.name]));
	} catch {
		throw new Error("[Documentation] Config is not valid!");
	}

	return new Module({
		id: "documentation",
		name: "Documentation",
		version,
		repo: "GoudronViande24/artibot-documentation",
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
							.addChoices(choices)
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