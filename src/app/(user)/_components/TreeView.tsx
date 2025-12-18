/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Circle,
  Square,
  Triangle,
  Diamond,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DiagramNodeProps = {
  label: string;
  value: any;
  level: number;
  isLast?: boolean;
  parentPath?: string;
};

const nodeIcons = [Circle, Square, Triangle, Diamond];
const nodeColors = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-accent-foreground",
  "bg-muted text-muted-foreground",
];

function DiagramNode({
  label,
  value,
  level,
  isLast = false,
  parentPath = "",
}: DiagramNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels

  const isObject = value && typeof value === "object" && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const hasChildren = isObject || isArray;

  const IconComponent = nodeIcons[level % nodeIcons.length];
  const nodeColorClass = nodeColors[level % nodeColors.length];
  const currentPath = parentPath ? `${parentPath}.${label}` : label;

  const renderValue = () => {
    if (isArray) {
      return (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((item: any, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {typeof item === "object" ? `Item ${index + 1}` : String(item)}
            </Badge>
          ))}
        </div>
      );
    }

    if (!isObject) {
      return (
        <span className="text-sm text-muted-foreground ml-2 font-medium">
          {String(value)}
        </span>
      );
    }

    return null;
  };

  return (
    <div className="relative">
      {/* Connection line to parent */}
      {level > 0 && (
        <div className="absolute -left-6 top-6 w-6 h-px bg-border"></div>
      )}

      {/* Vertical line for children */}
      {hasChildren && isExpanded && (
        <div
          className="absolute left-6 top-12 w-px bg-border"
          style={{ height: "calc(100% - 3rem)" }}
        ></div>
      )}

      <Card
        className={cn(
          "p-4 mb-3 transition-all duration-200 hover:shadow-md border-l-4",
          level === 0 && "border-l-primary shadow-sm",
          level === 1 && "border-l-secondary ml-6",
          level === 2 && "border-l-accent ml-12",
          level >= 3 && "border-l-muted ml-18"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 cursor-pointer select-none",
            hasChildren && "hover:bg-muted/50 -m-2 p-2 rounded-md"
          )}
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        >
          {/* Node icon */}
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
              nodeColorClass
            )}
          >
            <IconComponent size={16} />
          </div>

          {/* Expand/collapse indicator */}
          {hasChildren && (
            <div className="text-primary">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
          )}

          {/* Label and value */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-foreground capitalize">
                {label
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
              {isArray && (
                <Badge variant="secondary" className="text-xs">
                  {value.length} items
                </Badge>
              )}
            </div>
            {renderValue()}
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-4 space-y-2">
            {isObject &&
              Object.entries(value).map(([key, val], index, array) => (
                <DiagramNode
                  key={key}
                  label={key}
                  value={val}
                  level={level + 1}
                  isLast={index === array.length - 1}
                  parentPath={currentPath}
                />
              ))}
            {isArray &&
              value.map((item: any, index: number) => (
                <DiagramNode
                  key={index}
                  label={`Item ${index + 1}`}
                  value={item}
                  level={level + 1}
                  isLast={index === value.length - 1}
                  parentPath={currentPath}
                />
              ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default function ModernStudyDiagram({ data }: { data: any }) {
  if (!data || typeof data !== "object") {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No data to display</p>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Study Diagram
        </h2>
        <p className="text-muted-foreground">
          Interactive visualization of your resume data structure
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <DiagramNode key={key} label={key} value={value} level={0} />
        ))}
      </div>
    </div>
  );
}
