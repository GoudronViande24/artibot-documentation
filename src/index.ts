import { SlashCommandBuilder, APIApplicationCommandOptionChoice, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import Artibot, { Module, SlashCommand } from "artibot";

import { createRequire } from 'module';
import { ArtibotDocumentationConfig, Page } from "./interfaces.js";

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

let config: ArtibotDocumentationConfig;

/**
 * Documentation module
 * Allows to create a custom help command from a simple config.
 * @author GoudronViande24
 * @license MIT
 */
export default (artibot: Artibot, customConfig: ArtibotDocumentationConfig): Module => {
	const choices: APIApplicationCommandOptionChoice<string>[] = [];
	try {
		config = customConfig;
		const { commandDescription, argDescription, pages } = customConfig;
		if (!commandDescription || !argDescription || !pages || !pages.length) throw new Error("[Documentation]: config is not valid!");

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
				id: config.commandName,
				data: new SlashCommandBuilder()
					.setName(config.commandName)
					.setDescription(config.commandDescription)
					.addStringOption(option =>
						option
							.setName(config.argName)
							.setDescription(config.argDescription)
							.setRequired(true)
							.addChoices(...choices)
					),
				mainFunction
			})
		]
	});
}

async function mainFunction(interaction: ChatInputCommandInteraction<"cached">, { createEmbed }: Artibot): Promise<void> {
	const page: Page = config.pages.find(page => page.name == interaction.options.getString(config.argName, true))!;

	const embed: EmbedBuilder = createEmbed()
		.setTitle(`${config.name} | ${page.name}`)
		.setDescription(page.content);

	if (page.icon) embed.setThumbnail(page.icon);
	if (page.image) embed.setImage(page.image);
	if (page.author) embed.setAuthor({ name: page.author });

	await interaction.reply({
		embeds: [embed],
		ephemeral: true
	});
}