import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Lock, Users } from "lucide-react";

interface Milestone {
  icon: string;
  title: string;
  isUnlocked: boolean;
  unlockCondition?: string;
}

interface Community {
  name: string;
  members: number;
  icon: string;
}

interface BenefitCardProps {
  title: string;
  emoji: string;
  milestones: Milestone[];
  isActive: boolean;
  onClick: () => void;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  emoji,
  isActive,
  onClick,
}) => {
  return (
    <Card
      className={`w-full cursor-pointer transition-all duration-300 ${
        isActive ? "border-[#FFA500] border-2" : "border border-gray-200"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col items-center justify-center h-32">
        <span className="text-4xl mb-2">{emoji}</span>
        <h3
          className={`text-lg font-semibold text-center ${
            isActive ? "text-[#FFA500]" : "text-black"
          }`}
        >
          {title}
        </h3>
      </CardContent>
    </Card>
  );
};

const JourneyMap: React.FC<{ milestones: Milestone[] }> = ({ milestones }) => {
  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              milestone.isUnlocked ? "bg-[#4CAF50]" : "bg-gray-300"
            }`}
          >
            {milestone.isUnlocked ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : (
              <Lock className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div className="ml-4 flex-grow">
            <div className="flex items-center">
              <span className="text-2xl mr-2">{milestone.icon}</span>
              <span className="text-lg font-semibold">{milestone.title}</span>
            </div>
            {!milestone.isUnlocked && milestone.unlockCondition && (
              <p className="text-sm text-gray-600 mt-1">
                {milestone.unlockCondition}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const CommunityCard: React.FC<Community> = ({ name, members, icon }) => {
  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{icon}</span>
          <span className="font-semibold text-lg">{name}</span>
        </div>
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <Users className="w-4 h-4 mr-1 text-[#4CAF50]" />
          <span className="text-sm font-bold">{members}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const UnlockedBenefits: React.FC = () => {
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);

  const benefits = [
    {
      title: "Insurance",
      emoji: "🛡️",
      milestones: [
        { icon: "🏥", title: "Health Coverage", isUnlocked: true },
        { icon: "🚑", title: "Accident Insurance", isUnlocked: true },
        {
          icon: "👨‍👩‍👧‍👦",
          title: "Family Coverage",
          isUnlocked: false,
          unlockCondition: "Complete 50 gigs to unlock",
        },
      ],
    },
    {
      title: "Loans",
      emoji: "💰",
      milestones: [
        { icon: "🚨", title: "Emergency Loan", isUnlocked: true },
        {
          icon: "💼",
          title: "Business Loan",
          isUnlocked: false,
          unlockCondition: "Complete 100 gigs to unlock",
        },
        {
          icon: "🏠",
          title: "Housing Loan",
          isUnlocked: false,
          unlockCondition: "Maintain 4.8 rating for 6 months",
        },
      ],
    },
    {
      title: "Subsidies",
      emoji: "🏷️",
      milestones: [
        { icon: "🔧", title: "Tool Discount", isUnlocked: true },
        {
          icon: "📚",
          title: "Skill Upgrade",
          isUnlocked: false,
          unlockCondition: "Complete 75 gigs to unlock",
        },
        {
          icon: "🎫",
          title: "License Renewal",
          isUnlocked: false,
          unlockCondition: "Maintain 4.7 rating for 1 year",
        },
      ],
    },
  ];

  const communities: Community[] = [
    { name: "Plumbers of Bangalore", members: 1234, icon: "🔧" },
    { name: "Urban Company Partners", members: 5678, icon: "🏙️" },
    { name: "Handymen Network", members: 3456, icon: "🛠️" },
    { name: "Electricians United", members: 2345, icon: "⚡" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-left mt-6 mb-2">
          Unlocked Benefits
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.title}
              {...benefit}
              isActive={expandedBenefit === benefit.title}
              onClick={() =>
                setExpandedBenefit(
                  expandedBenefit === benefit.title ? null : benefit.title
                )
              }
            />
          ))}
        </div>
        {expandedBenefit && (
          <Card className="w-full mt-4 border-[#FFA500] border-2">
            <CardContent className="p-4">
              <h4 className="text-xl font-semibold mb-4 text-[#FFA500]">
                {expandedBenefit} Journey
              </h4>
              <JourneyMap
                milestones={
                  benefits.find((b) => b.title === expandedBenefit)
                    ?.milestones || []
                }
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-left mb-4">Your Communities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {communities.map((community) => (
            <CommunityCard key={community.name} {...community} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnlockedBenefits;
