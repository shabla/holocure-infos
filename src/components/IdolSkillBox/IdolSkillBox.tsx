import React from "react";

import { Box, Sprite, InfoTable } from "@/components";
import { Skill } from "@/models";
import { getHighlightedElements } from "@/utils/getHighlightedElements";
import { styled } from "@/styles";

export interface IdolSkillBoxProps {
	title: string;
	skills?: Skill[];
}

const IdolSkillBoxStyled = styled(Box, {
	width: "500px",
	"& > main": {
		padding: 0,
	},
});

const SkillName = styled("div", {
	padding: "$2",
	fontSize: "20px",
	display: "flex",
	alignItems: "center",
});

const DescOnly = styled("div", {
	padding: "0 $2 $2 $2",
});

export const IdolSkillBox = ({ title, skills }: IdolSkillBoxProps) => {
	return (
		<IdolSkillBoxStyled label={title}>
			{skills?.map((skill) => (
				<React.Fragment key={skill?.name}>
					<SkillName>
						<Sprite type="skills" name={skill?.name} showBackground={false} />
						{skill?.name}
					</SkillName>

					{skill?.levels?.length === 1 ? (
						<DescOnly>{skill?.levels[0].desc}</DescOnly>
					) : (
						<InfoTable>
							<tbody>
								{skill?.levels.map((level) => (
									<tr key={level.level}>
										<td className="name">Level {level.level}</td>
										<td>{getHighlightedElements(level.desc)}</td>
									</tr>
								))}
							</tbody>
						</InfoTable>
					)}
				</React.Fragment>
			))}
		</IdolSkillBoxStyled>
	);
};
