import { useSelector } from "react-redux";
import { selectTaskStats } from "../store/tasksSlice";
import { BarChart3, CheckCircle, Clock, AlertCircle } from "lucide-react";

const TaskStats = () => {
  const stats = useSelector(selectTaskStats);
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: BarChart3,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-800",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
    },
    {
      label: "High Priority",
      value: stats.high,
      icon: AlertCircle,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map(
        ({ label, value, icon: Icon, color, bgColor, textColor }) => (
          <div
            key={label}
            className={`${bgColor} p-6 rounded-xl border border-opacity-20`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${textColor} opacity-75`}>
                  {label}
                </p>
                <p className={`text-3xl font-bold ${textColor} mt-2`}>
                  {value}
                </p>
              </div>
              <div className={`${color} p-3 rounded-lg text-white`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        )
      )}

      {stats.total > 0 && (
        <div className="md:col-span-2 lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Progress Overview
              </h3>
              <span className="text-2xl font-bold text-blue-600">
                {completionRate}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-red-600">{stats.high}</div>
                <div className="text-gray-500">High Priority</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-600">
                  {stats.medium}
                </div>
                <div className="text-gray-500">Medium Priority</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">{stats.low}</div>
                <div className="text-gray-500">Low Priority</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStats;
